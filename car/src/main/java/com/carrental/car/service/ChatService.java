package com.carrental.car.service;

import com.carrental.car.model.Car;
import com.carrental.car.dto.ChatMessageDto;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ChatService {

    private final ChatClient chatClient;
    private final CarService carService;
    private final RedisTemplate<String, Object> redisTemplate;

    public ChatService(ChatClient.Builder chatClientBuilder, CarService carService, RedisTemplate<String, Object> redisTemplate) {
        this.chatClient = chatClientBuilder.build();
        this.carService = carService;
        this.redisTemplate = redisTemplate;
    }

    public String chat(String userMessage, String sessionId, List<ChatMessageDto> history) {
        String sessionKey = sessionId != null ? sessionId : "default";
        String redisLocationKey = "chat:location:" + sessionKey;
        
        // Fetch location from Redis
        String userLocation = (String) redisTemplate.opsForValue().get(redisLocationKey);
        
        List<Car> availableCars;
        if (userLocation != null && !userLocation.trim().isEmpty()) {
            availableCars = carService.getAvailableCarsByLocation(userLocation);
        } else {
            availableCars = carService.getAvailableCars(); // fallback
        }

        // Build a context string
        String carContext = "Currently available cars for rent";
        if (userLocation != null && !userLocation.trim().isEmpty()) {
            carContext += " in " + userLocation;
        }
        carContext += ":\n";

        if (availableCars.isEmpty()) {
            carContext += "No cars are currently available.\n";
        } else {
            carContext += availableCars.stream()
                    .map(c -> String.format("- %s (Location: %s, Price: $%.2f/day, Seats: %d, Fuel: %s, Reg: %s)",
                            c.getName(), c.getLocation(), c.getPrice(), c.getSeatingCapacity(), c.getFuelEfficiency(), c.getRegistrationNumber()))
                    .collect(Collectors.joining("\n"));
        }

        String systemPrompt = "You are a helpful and polite AI assistant for a car rental company called 'WheelX'. " +
                "Your goal is to help users find the perfect car for their needs. " +
                "Answer the user's questions based ONLY on the following available car inventory.\n\n" +
                carContext + "\n\n" +
                "IMPORTANT RULES:\n" +
                "1. If the user has not mentioned their city or location, politely ask them for their location first so you can recommend cars available near them.\n" +
                "2. If you identify the user's city or location based on the chat, you MUST output a tag <location>CITY_NAME</location> exactly once in your response (e.g. <location>Delhi</location>).\n" +
                "3. If the user asks for a car not in the inventory, politely inform them that it is currently not available, but suggest the closest alternative.\n" +
                "4. You CANNOT make bookings, take dates, or process payments. Once the user selects a final car, praise their choice (e.g. 'Great choice!') and explicitly tell them to navigate to the 'Book Now' section in the top menu to complete their booking.\n" +
                "Keep responses concise, friendly, and structured. Format prices clearly using Markdown.";

        List<Message> springAiMessages = new ArrayList<>();
        springAiMessages.add(new SystemMessage(systemPrompt));

        if (history != null) {
            for (ChatMessageDto msg : history) {
                // Skip the initial greeting if it's there
                if (msg.getText() != null && msg.getText().startsWith("Hi there! Looking for a car?")) continue;
                
                if ("user".equals(msg.getSender())) {
                    springAiMessages.add(new UserMessage(msg.getText()));
                } else if ("bot".equals(msg.getSender())) {
                    springAiMessages.add(new AssistantMessage(msg.getText()));
                }
            }
        }
        
        springAiMessages.add(new UserMessage(userMessage));

        // Call the AI model
        String responseContent = this.chatClient.prompt()
                .messages(springAiMessages)
                .call()
                .content();

        // Extract <location> tags
        Pattern pattern = Pattern.compile("<location>(.*?)</location>", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(responseContent);
        if (matcher.find()) {
            String extractedLocation = matcher.group(1).trim();
            // Save to Redis with 1 hour expiration
            redisTemplate.opsForValue().set(redisLocationKey, extractedLocation, 1, TimeUnit.HOURS);
            
            // Remove the tag from the user-facing response
            responseContent = responseContent.replaceAll("(?i)<location>.*?</location>", "").trim();
        }

        return responseContent;
    }
}

package com.carrental.car.service;

import com.carrental.car.model.Car;
import com.carrental.car.dto.ChatMessageDto;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatClient chatClient;
    private final CarService carService;

    public ChatService(ChatClient.Builder chatClientBuilder, CarService carService) {
        this.chatClient = chatClientBuilder.build();
        this.carService = carService;
    }

    public String chat(String userMessage, List<ChatMessageDto> history) {
        // Fetch available cars to provide context
        List<Car> availableCars = carService.getAvailableCars();

        // Build a context string
        String carContext = "Currently available cars for rent:\n";
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
                "2. If the user asks for a car not in the inventory, politely inform them that it is currently not available, but suggest the closest alternative.\n" +
                "3. You CANNOT make bookings, take dates, or process payments. Once the user selects a final car, praise their choice (e.g. 'Great choice!') and explicitly tell them to navigate to the 'Book Now' section in the top menu to complete their booking.\n" +
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
        return this.chatClient.prompt()
                .messages(springAiMessages)
                .call()
                .content();
    }
}

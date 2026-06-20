package com.carrental.car.controller;

import com.carrental.car.dto.ChatRequest;
import com.carrental.car.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<Map<String, String>> chat(@RequestBody ChatRequest request) {
        String aiResponse = chatService.chat(request.getMessage(), request.getSessionId(), request.getHistory());
        
        Map<String, String> response = new HashMap<>();
        response.put("response", aiResponse);
        
        return ResponseEntity.ok(response);
    }
}

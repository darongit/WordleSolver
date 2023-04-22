package com.example.wordlesolver.front;

import com.example.wordlesolver.words.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

@Service
public class FrontService {
    private WordService wordService;
    @Autowired
    public FrontService(WordService wordService) {
        this.wordService = wordService;
    }

    public String mainPage(Model model) {
        return "main";
    }
}

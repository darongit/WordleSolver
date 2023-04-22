package com.example.wordlesolver.words;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class WordController {
    private WordService wordService;
    @Autowired
    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @PostMapping("/api/getwords")
    public List<String> getWords(@RequestBody Query query) {
        return wordService.getWords(query);
    }
}

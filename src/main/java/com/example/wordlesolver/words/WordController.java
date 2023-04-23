package com.example.wordlesolver.words;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WordController {
    private WordService wordService;
    @Autowired
    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @PostMapping("/getwords")
    public List<String> getWords(@RequestBody Query query) {
        return wordService.getWords(query);
    }

    @PostMapping("/addwords")
    public void addWords(@RequestBody List<String> words) {
        wordService.addWords(words);
    }
}

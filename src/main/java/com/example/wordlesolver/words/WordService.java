package com.example.wordlesolver.words;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WordService {
    private WordRepository wordRepository;
    @Autowired
    public WordService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    public void addWord(String word) {
        String wordToAdd = word.toLowerCase().strip();
        if (wordToAdd.length() != 5) {
            return;
        }
        wordRepository.save(new Word(wordToAdd));
    }

    public List<String> getWords(Query query) {
        List<String> result = new ArrayList<>();

        if (query.getValidLetters().keySet().size() == 0
                && query.getExcluded().length() == 0
                && query.getIncluded().length() == 0) {
            result.add("empty-fields");
            return result;
        }

        String tmpString;

        mainLoop:
        for (Word word: wordRepository.findAll()) {
            tmpString = word.getWord();
            for (Integer idx: query.getValidLetters().keySet()) {
                if (!(query.getValidLetters().get(idx).equals(tmpString.charAt(idx)))) {
                    continue mainLoop;
                }
            }
            for (Character letter: query.getIncluded().toCharArray()) {
                if (!tmpString.contains(String.valueOf(letter))) {
                    continue mainLoop;
                }
            }
            for (Character letter: query.getExcluded().toCharArray()) {
                if (tmpString.contains(String.valueOf(letter))) {
                    continue mainLoop;
                }
            }
            result.add(tmpString);
        }
        if (result.size() == 0) {
            result.add("no-matches");
        }
        return result;
    }
}

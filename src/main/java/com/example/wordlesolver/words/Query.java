package com.example.wordlesolver.words;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;

@Getter
@Setter
public class Query {
    private String excluded;
    private String included;
    private HashMap<Integer, Character> validLetters;

    public Query(String excluded, String included, HashMap<Integer, Character> validLetters) {
        this.validLetters = validLetters;
        this.included = makeIncluded(included, validLetters);
        this.excluded = excluded;
    }
    private String makeIncluded(String included, HashMap<Integer, Character> validLetters) {
        StringBuilder result = new StringBuilder();
        result.append(included);
        for (Character letter: validLetters.values()) {
            if (!included.contains(letter.toString())) {
                result.append(letter);
            }
        }
        return result.toString();
    }
}

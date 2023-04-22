package com.example.wordlesolver.words;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Word {
    @Id
    @SequenceGenerator(
            name = "wordSequence",
            sequenceName = "wordSequence",
            initialValue = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "wordSequence"
    )
    private Long wordId;
    private String word;

    public Word(String word) {
        this.word = word;
    }
}

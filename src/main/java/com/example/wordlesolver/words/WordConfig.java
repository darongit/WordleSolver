package com.example.wordlesolver.words;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.FileNotFoundException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Scanner;

@Configuration
public class WordConfig implements CommandLineRunner {

    private WordService wordService;
    @Autowired
    public WordConfig(WordService wordService) {
        this.wordService = wordService;
    }

    @Override
    public void run(String... args) throws Exception {
        loadWordsFromFile();
    }

    private void loadWordsFromFile() {
        Scanner scanner = null;
        Path path = Paths.get("src/main/resources/static/words/words.txt");
        if (!path.toFile().exists()) {
            throw new IllegalStateException("Can't find words file.");
        }

        File file = new File(path.toString());
        try {
            scanner = new Scanner(file);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e + "\nScanner initiation failed");
        }
        while (scanner.hasNextLine()) {
            wordService.addWord(scanner.nextLine());
        }
        scanner.close();
    }
}

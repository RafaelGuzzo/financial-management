package br.guzzo.financialmanagement;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication(scanBasePackages = "br.guzzo.financialmanagement")
public class FinancialManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(FinancialManagementApplication.class, args);
    }

    // Adicione este bean para executar quando a aplicação iniciar
    @Bean
    public CommandLineRunner printAllClasses() {
        return args -> {
            String packageName = "br.guzzo.financialmanagement";
            try {
                System.out.println("=== LISTANDO CÓDIGO DAS CLASSES ===");
                printAllJavaFiles(packageName);
            } catch (Exception e) {
                System.err.println("Erro ao ler classes: " + e.getMessage());
            }
        };
    }

    private static void printAllJavaFiles(String basePackage) throws Exception {
        String projectDir = System.getProperty("user.dir");
        String packagePath = basePackage.replace('.', '/');
        Path srcDir = Paths.get(projectDir, "src", "main", "java", packagePath);

        Files.walk(srcDir)
                .filter(Files::isRegularFile)
                .filter(path -> path.toString().endsWith(".java"))
                .forEach(path -> {
                    try {
                        System.out.println("\n=== " + path + " ===\n");
                        Files.lines(path).forEach(System.out::println);
                    } catch (Exception e) {
                        System.err.println("Erro ao ler arquivo: " + path);
                    }
                });
    }
}
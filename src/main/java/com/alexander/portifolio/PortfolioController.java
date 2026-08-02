package com.alexander.portifolio;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PortfolioController {

    @GetMapping("/api/portfolio")
    public String getPortfolio() {
        return "API de portfólio funcionando!";
    }
}

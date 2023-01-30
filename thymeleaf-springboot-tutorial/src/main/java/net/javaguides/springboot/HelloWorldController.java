package net.javaguides.springboot;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller
public class HelloWorldController {
    
    @GetMapping("/hello")
    public String hello(Model model) {
        model.addAttribute("message", "This is the menu");
        return "helloworld";
    }
    
    
}

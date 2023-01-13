/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pai.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Michal_Grabowski
 */
@RestController
public class TestController {
    
    @RequestMapping({ "/hello" })
    public String welcomePage() {
        return "Welcome!";
    }
    
    
}

package me.eastglow.controller;

import me.eastglow.vo.LoginVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.HttpSessionRequiredException;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;

@Controller
public class HomeController {

    @GetMapping(value="/login")
    public String login(HttpSession session) {
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");

        if(loginVO != null && loginVO.isValidUser()){
            return "redirect:/index";
        }

        return "login.html";
    }

    @GetMapping(value="/index")
    public String index() {

        return "index.html";
    }
}

package me.eastglow.controller;

import lombok.extern.slf4j.Slf4j;
import me.eastglow.service.LoginService;
import me.eastglow.vo.LoginVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Slf4j
@Controller
public class LoginController {

    @Resource
    private LoginService loginService;

    @PostMapping(value="/login")
    @ResponseBody
    public ResponseEntity<Boolean> login(HttpSession session, LoginVO paramVO) throws Exception {
        LoginVO viewVO = loginService.getValidUserView(paramVO);

        if(paramVO == null || StringUtils.isEmpty(paramVO.getUserId()) || StringUtils.isEmpty(paramVO.getUserPw())){
            return new ResponseEntity<>(viewVO.isValidUser(), HttpStatus.BAD_REQUEST);
        }else{
            if(viewVO.isValidUser()){
                session.setAttribute("loginVO", viewVO);
            }

            return new ResponseEntity<>(viewVO.isValidUser(), HttpStatus.OK);
        }
    }

    @RequestMapping(value="/logout")
    public String logout(HttpSession session) {
        session.invalidate();

        return "redirect:login";
    }
}
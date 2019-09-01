package me.eastglow.service;


import me.eastglow.vo.LoginVO;

public interface LoginService {

    void setInitUserData() throws Exception;

    LoginVO getValidUserView(LoginVO loginVO) throws Exception;
}

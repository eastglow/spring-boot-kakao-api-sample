package me.eastglow.dao;

import me.eastglow.vo.LoginVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    void insertInitUserData(LoginVO loginVO) throws Exception;

    LoginVO selectUserView(LoginVO loginVO) throws Exception;
}

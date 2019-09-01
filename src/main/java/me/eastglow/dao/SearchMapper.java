package me.eastglow.dao;

import me.eastglow.vo.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SearchMapper {

    List<SearchVO> selectHistoryList(int userPkid) throws Exception;

    List<SearchVO> selectTopKeywordList() throws Exception;

    void insertHistory(SearchVO searchVO) throws Exception;

    int selectKeywordCnt(String keywordNm) throws Exception;

    void insertKeyword(String keywordNm) throws Exception;

    void updateKeywordCnt(String keywordNm) throws Exception;
}

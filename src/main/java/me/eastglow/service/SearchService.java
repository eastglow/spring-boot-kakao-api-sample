package me.eastglow.service;

import me.eastglow.vo.SearchVO;

import java.util.List;

public interface SearchService {

    List<SearchVO> getHistoryList(int userPkid) throws Exception;

    List<SearchVO> getTopKeywordList() throws Exception;

    void createHistory(SearchVO searchVO) throws Exception;

    void mergeKeyword(SearchVO searchVO) throws Exception;
}

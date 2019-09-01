package me.eastglow.service;

import me.eastglow.dao.SearchMapper;
import me.eastglow.vo.SearchVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class SearchServiceImpl implements SearchService {

    @Resource
    private SearchMapper searchMapper;

    @Override
    public List<SearchVO> getHistoryList(int userPkid) throws Exception {
        return searchMapper.selectHistoryList(userPkid);
    }

    @Override
    public List<SearchVO> getTopKeywordList() throws Exception {
        return searchMapper.selectTopKeywordList();
    }

    @Override
    public void createHistory(SearchVO searchVO) throws Exception {
        searchMapper.insertHistory(searchVO);
    }

    @Override
    @Transactional
    public void mergeKeyword(SearchVO searchVO) throws Exception {
        int keywordCnt = searchMapper.selectKeywordCnt(searchVO.getKeywordNm());

        if(keywordCnt > 0){
            searchMapper.updateKeywordCnt(searchVO.getKeywordNm());
        }else{
            searchMapper.insertKeyword(searchVO.getKeywordNm());
        }
    }
}

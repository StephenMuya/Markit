package com.notionflow.service;

import com.notionflow.model.Deal;
import com.notionflow.model.Firm;
import com.notionflow.repository.DealRepository;
import com.notionflow.repository.FirmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DealService {

    @Autowired
    private DealRepository dealRepository;

    @Autowired
    private FirmRepository firmRepository;

    @Transactional
    public Deal saveDeal(Deal deal) {
        // Check for duplicate by article_id
        if (dealRepository.existsByArticleId(deal.getArticleId())) {
            throw new RuntimeException("Deal with article_id " + deal.getArticleId() + " already exists");
        }

        // Get or create equity partner firm
        if (deal.getEquityPartner() != null && !deal.getEquityPartner().isEmpty()) {
            Firm equityFirm = getOrCreateFirm(deal.getEquityPartner(), "Equity Partner");
            deal.setEquityPartnerFirm(equityFirm);
        }

        // Get or create developer firm
        if (deal.getDeveloper() != null && !deal.getDeveloper().isEmpty()) {
            Firm developerFirm = getOrCreateFirm(deal.getDeveloper(), "Developer");
            deal.setDeveloperFirm(developerFirm);
        }

        return dealRepository.save(deal);
    }

    @Transactional
    public Firm getOrCreateFirm(String firmName, String firmType) {
        Optional<Firm> existingFirm = firmRepository.findByFirmName(firmName);
        
        if (existingFirm.isPresent()) {
            return existingFirm.get();
        }

        Firm newFirm = new Firm();
        newFirm.setFirmName(firmName);
        newFirm.setFirmType(firmType);
        return firmRepository.save(newFirm);
    }

    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }

    public List<Deal> getDealsBySource(String sourceName) {
        return dealRepository.findBySourceName(sourceName);
    }

    public List<Deal> searchDeals(String keyword) {
        return dealRepository.searchByKeyword(keyword);
    }

    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalDeals", dealRepository.count());
        stats.put("totalFirms", firmRepository.count());
        
        List<Object[]> dealsBySource = dealRepository.countDealsBySource();
        Map<String, Long> sourceMap = new HashMap<>();
        for (Object[] row : dealsBySource) {
            sourceMap.put((String) row[0], (Long) row[1]);
        }
        stats.put("dealsBySource", sourceMap);
        
        return stats;
    }

    public List<Firm> getAllFirms() {
        return firmRepository.findAll();
    }
}

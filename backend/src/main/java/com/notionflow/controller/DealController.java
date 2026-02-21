package com.notionflow.controller;

import com.notionflow.model.Deal;
import com.notionflow.model.Firm;
import com.notionflow.service.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class DealController {

    @Autowired
    private DealService dealService;

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("NotionFlow API is running");
    }

    @PostMapping("/deals")
    public ResponseEntity<?> createDeal(@RequestBody Deal deal) {
        try {
            Deal savedDeal = dealService.saveDeal(deal);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDeal);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/deals")
    public ResponseEntity<List<Deal>> getAllDeals() {
        List<Deal> deals = dealService.getAllDeals();
        return ResponseEntity.ok(deals);
    }

    @GetMapping("/deals/source/{sourceName}")
    public ResponseEntity<List<Deal>> getDealsBySource(@PathVariable String sourceName) {
        List<Deal> deals = dealService.getDealsBySource(sourceName);
        return ResponseEntity.ok(deals);
    }

    @GetMapping("/deals/search")
    public ResponseEntity<List<Deal>> searchDeals(@RequestParam String keyword) {
        List<Deal> deals = dealService.searchDeals(keyword);
        return ResponseEntity.ok(deals);
    }

    @GetMapping("/firms")
    public ResponseEntity<List<Firm>> getAllFirms() {
        List<Firm> firms = dealService.getAllFirms();
        return ResponseEntity.ok(firms);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = dealService.getStats();
        return ResponseEntity.ok(stats);
    }
}

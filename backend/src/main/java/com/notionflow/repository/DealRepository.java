package com.notionflow.repository;

import com.notionflow.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {
    
    Optional<Deal> findByArticleId(String articleId);
    
    boolean existsByArticleId(String articleId);
    
    List<Deal> findBySourceName(String sourceName);
    
    @Query("SELECT d FROM Deal d WHERE " +
           "LOWER(d.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(d.summary) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(d.equityPartner) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(d.developer) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Deal> searchByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT d.sourceName, COUNT(d) FROM Deal d GROUP BY d.sourceName")
    List<Object[]> countDealsBySource();
}

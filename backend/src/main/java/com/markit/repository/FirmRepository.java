package com.markit.repository;

import com.markit.model.Firm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FirmRepository extends JpaRepository<Firm, Long> {
    
    Optional<Firm> findByFirmName(String firmName);
    
    boolean existsByFirmName(String firmName);
}

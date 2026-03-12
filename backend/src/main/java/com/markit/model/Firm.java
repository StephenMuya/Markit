package com.markit.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "firms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Firm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "firm_name", nullable = false, unique = true)
    private String firmName;

    @Column(name = "firm_type", nullable = false)
    private String firmType;

    @Column(name = "website")
    private String website;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

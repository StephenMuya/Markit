package com.notionflow.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "deals", indexes = {
    @Index(name = "idx_article_id", columnList = "article_id"),
    @Index(name = "idx_source_name", columnList = "source_name"),
    @Index(name = "idx_date_scraped", columnList = "date_scraped")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "article_id", nullable = false, unique = true)
    private String articleId;

    @Column(name = "source_name", nullable = false)
    private String sourceName;

    @Column(name = "source_url", nullable = false)
    private String sourceUrl;

    @Column(name = "title")
    private String title;

    @Column(name = "date_scraped", nullable = false)
    private LocalDateTime dateScraped;

    @Column(name = "equity_partner")
    private String equityPartner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "equity_partner_id")
    private Firm equityPartnerFirm;

    @Column(name = "developer")
    private String developer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "developer_id")
    private Firm developerFirm;

    @Column(name = "structure")
    private String structure;

    @Column(name = "market")
    private String market;

    @Column(name = "summary", columnDefinition = "TEXT")
    private String summary;

    @Column(name = "confidence")
    private Double confidence;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

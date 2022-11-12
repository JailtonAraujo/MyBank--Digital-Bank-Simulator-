package com.br.mybank.Model.Operations;

import com.br.mybank.Model.Account;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity(name = "tbl_transfer")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransferOperation implements Serializable {

    private static final long serialVersionUID = -7710597766231035951L;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE,fetch = FetchType.EAGER,optional = false)
    @JoinColumn(name = "account_origem")
    @org.hibernate.annotations.ForeignKey(name = "fk_transfer_origem_account")
    private Account accountOrigem;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER,optional = false)
    @JoinColumn(name = "account_destino")
    @org.hibernate.annotations.ForeignKey(name = "fk_transfer_destino_account")
    private Account accountDestino;

    @Column(nullable = false)
    private Double value;

    @Column(nullable = false)
    private LocalDate date;
}

package com.br.mybank.DTO;

import java.io.Serializable;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransferDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
    private Long id;

    private String namePersonOrigem;
    
    private String namePersonDestino;
	
    private Double value;

    private LocalDate date;
    


}

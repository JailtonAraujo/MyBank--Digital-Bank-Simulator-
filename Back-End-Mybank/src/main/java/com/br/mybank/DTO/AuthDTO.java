package com.br.mybank.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthDTO {

	private Long userId;

	private String name;
	
	private Long accountId;
	
	private String token;
	

}

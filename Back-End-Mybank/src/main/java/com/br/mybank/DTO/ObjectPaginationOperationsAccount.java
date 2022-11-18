package com.br.mybank.DTO;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ObjectPaginationOperationsAccount implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long accountId;
	
	private int offset;
	
	private int limit;

}

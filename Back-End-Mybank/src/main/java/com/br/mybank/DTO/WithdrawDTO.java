package com.br.mybank.DTO;
import com.br.mybank.Model.Operations.WithdrawMoneyOperation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WithdrawDTO implements Serializable {

    private static final long serialVersionUID = 4304600343015637173L;

    private Long id;

    private Double value;

    private LocalDate date;

    public WithdrawDTO(WithdrawMoneyOperation operation){
          this.id = operation.getId();
          this.date = operation.getDate();
          this.value = operation.getValue();
    }
}

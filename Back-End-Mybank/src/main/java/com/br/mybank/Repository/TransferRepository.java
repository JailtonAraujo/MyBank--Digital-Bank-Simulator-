package com.br.mybank.Repository;

import com.br.mybank.Model.Operations.TransferOperation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepository extends JpaRepository<TransferOperation, Long> {
}

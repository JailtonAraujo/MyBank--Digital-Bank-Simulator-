package com.br.mybank.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UnsupportedMathOperationException extends RuntimeException{

    private static final long serialVersionUID = -5444540119350135819L;

    public UnsupportedMathOperationException(String exception) {
        super(exception);
    }
}

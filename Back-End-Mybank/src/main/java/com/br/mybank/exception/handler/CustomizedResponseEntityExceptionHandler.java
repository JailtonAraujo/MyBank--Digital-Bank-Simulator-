package com.br.mybank.exception.handler;

import com.br.mybank.exception.AlreadyExistsCPFException;
import com.br.mybank.exception.ExceptionResponse;
import com.br.mybank.exception.UnsupportedMathOperationException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import javax.persistence.NoResultException;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Date;

@RestController
@ControllerAdvice
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ExceptionResponse> handlerAllExceptions(Exception ex, WebRequest webRequest){

            ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),ex.getMessage(),webRequest.getDescription(false));

            return new ResponseEntity<ExceptionResponse>(exceptionResponse,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({UnsupportedMathOperationException.class, SQLIntegrityConstraintViolationException.class})
    public final ResponseEntity<ExceptionResponse> handlerBadRequestsExceptions(Exception ex, WebRequest webRequest){

        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),ex.getMessage(),webRequest.getDescription(false));

        return new ResponseEntity<ExceptionResponse>(exceptionResponse,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoResultException.class)
    public final ResponseEntity<ExceptionResponse> handlerNotFoundExceptions(Exception ex, WebRequest webRequest){

        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),ex.getMessage(),webRequest.getDescription(false));

        return new ResponseEntity<ExceptionResponse>(exceptionResponse,HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler({RuntimeException.class,UsernameNotFoundException.class})
    public final ResponseEntity<ExceptionResponse> handlerRuntimeExceptions(Exception ex, WebRequest webRequest){

        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),ex.getMessage(),webRequest.getDescription(false));

        return new ResponseEntity<ExceptionResponse>(exceptionResponse,HttpStatus.FORBIDDEN);
    }
    
    
    @ExceptionHandler({AlreadyExistsCPFException.class})
    public final ResponseEntity<ExceptionResponse> handlerAlreadyExistisCPFExceptions(Exception ex, WebRequest webRequest){

        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(),ex.getMessage(),webRequest.getDescription(false));

        return new ResponseEntity<ExceptionResponse>(exceptionResponse,HttpStatus.NOT_ACCEPTABLE);
    }
    
      
}

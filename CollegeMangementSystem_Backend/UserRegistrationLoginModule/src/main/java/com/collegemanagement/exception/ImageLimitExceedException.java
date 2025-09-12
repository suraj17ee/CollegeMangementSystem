package com.collegemanagement.exception;

public class ImageLimitExceedException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ImageLimitExceedException(){super();}

    public ImageLimitExceedException(String message){super(message);}

}

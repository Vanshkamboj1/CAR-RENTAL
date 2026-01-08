package com.carrental.car.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageUploadService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) throws IOException {
        // Upload the file to Cloudinary
        // .getBytes() converts the file into a byte array
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

        // The upload result is a Map. We want to get the "secure_url" value,
        // which is the public HTTPS URL of the uploaded image.
        return (String) uploadResult.get("secure_url");
    }
}
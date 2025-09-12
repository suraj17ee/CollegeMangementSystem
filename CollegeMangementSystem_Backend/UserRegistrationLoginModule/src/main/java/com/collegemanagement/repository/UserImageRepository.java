package com.collegemanagement.repository;

import com.collegemanagement.entity.User;
import com.collegemanagement.entity.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserImageRepository extends JpaRepository<UserImage, Long> {
    List<UserImage> findByUser(User user);
}

package com.example.demo.domain.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
@Builder
public class MemoDto {
	@Min(value=10,message="최소 숫자는 10이상 이어야합니다.")
	@Max(value=1000,message="최대 숫자는 1000이하 이어야합니다.")
	private int id;
	@NotBlank(message="text를 입력하세요.")
	private String text;
	@NotBlank(message="작성자를 입력하세요")
	@Email(message="유효한 이메일 주소를 입력하세요")
	private String writer;

	@Future(message="현재날짜 이후날짜로 선택하셔야 됩니다.")
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss" )
	private LocalDateTime regdate; // yyyy-MM-dd HH:mm:ss
}

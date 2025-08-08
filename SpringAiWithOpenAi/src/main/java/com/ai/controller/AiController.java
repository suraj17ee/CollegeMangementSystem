package com.ai.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.ChatClient.CallResponseSpec;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai")
public class AiController {

	Logger logger = LoggerFactory.getLogger(AiController.class);

//	private OpenAiChatModel openAiChatModel;
	private ChatClient chatClient;
	private OpenAiImageModel openAiImageModel;

//	public AiController(OpenAiChatModel openAiChatModel) {
//		this.chatClient = ChatClient.create(openAiChatModel);
//	}

	public AiController(OpenAiImageModel aiImageModel, ChatClient.Builder builder) {
		this.openAiImageModel = aiImageModel;
		this.chatClient = builder.build();
	}

	// only for text based results
	@GetMapping("/api/text/{prompt}")
	public String generateTextResult(@PathVariable("prompt") String prompt) {
		String content = chatClient.prompt(prompt).call().content();
		return content;
	}

	// for image generate
	@GetMapping("/api/image/{prompt}")
	public String generateImageResult(@PathVariable("prompt") String prompt) {
		ImagePrompt imagePrompt = new ImagePrompt(prompt);
		ImageResponse response = openAiImageModel.call(imagePrompt);
		logger.info("Metadata:{}", response.getResult().getMetadata());
		String url = response.getResult().getOutput().getUrl();
		return url;
	}

	// for both text and image response
	@GetMapping("/api/{prompt}")
	public String generateResult(@PathVariable("prompt") String prompt) {
		boolean contains = prompt.contains("image");
		if (contains) {
			ImagePrompt imagePrompt = new ImagePrompt(prompt);
			ImageResponse response = openAiImageModel.call(imagePrompt);
			logger.info("Metadata:{}", response.getResult().getMetadata());
			String url = response.getResult().getOutput().getUrl();
			return url;
		} else {
			ChatResponse chatResponse = chatClient.prompt(prompt).call().chatResponse();
			AssistantMessage output = chatResponse.getResult().getOutput();
			return output.getText();
		}
	}
}

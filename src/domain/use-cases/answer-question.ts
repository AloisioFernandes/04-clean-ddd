import { Answer } from "../entities/answer.js";

interface AnswerQuestionUseCaseRequest {
  questionId: string;
  instructorId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({ content, authorId: instructorId, questionId });

    return answer;
  }
}

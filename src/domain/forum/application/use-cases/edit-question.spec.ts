import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import { makeQuestion } from "test/factories/make-question.js";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository.js";
import { EditQuestionUseCase } from "./edit-question.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: "author-1",
      questionId: newQuestion.id.toValue(),
      title: "Edited Question Title",
      content: "Edited Question Content",
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "Edited Question Title",
      content: "Edited Question Content",
    });
  });

  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      authorId: "author-2",
      questionId: newQuestion.id.toValue(),
      title: "Edited Question Title",
      content: "Edited Question Content",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});

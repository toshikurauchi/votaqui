import { off, onValue, ref as databaseRef } from "firebase/database";
import { useEffect, useState } from "react";
import { IQuestion } from "../models/poll";
import { database } from "../services/firebase-client";

const useSnapshot = <T extends unknown>(path: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  useEffect(() => {
    const query = databaseRef(database, path);
    console.log("HERE", query);
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log("HERE INSIDE", data);
      setValue(data);
    });

    return () => {
      off(query);
    };
  }, [path]);

  return value;
};

const useCurrentQuestion = (pollSlug: string) => {
  const questionIdx = useSnapshot<number>(
    `/polls/${pollSlug}/currentQuestion`,
    -1
  );

  const questions = useSnapshot<IQuestion[]>(
    `/polls/${pollSlug}/questions`,
    []
  );

  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    null
  );
  useEffect(() => {
    if (questionIdx < questions.length) {
      setCurrentQuestion(questions[questionIdx]);
    } else {
      setCurrentQuestion(null);
    }
  }, [questions, questionIdx]);

  return currentQuestion;
};

export { useCurrentQuestion };

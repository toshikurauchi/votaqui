import { off, onValue, ref as databaseRef, set } from "firebase/database";
import { useEffect, useState } from "react";
import { IPollMeta, IQuestion } from "../models/poll";
import { database } from "../services/firebase-client";

const useSnapshot = <T extends unknown>(path: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  useEffect(() => {
    const query = databaseRef(database, path);
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      setValue(data);
    });

    return () => {
      off(query);
    };
  }, [path]);

  return value;
};

const useCurrentQuestion = (
  pollSlug: string
): [IQuestion | null, IPollMeta | null] => {
  const meta = useSnapshot<IPollMeta | null>(`/polls/${pollSlug}/meta`, null);

  const questions = useSnapshot<IQuestion[]>(
    `/polls/${pollSlug}/questions`,
    []
  );

  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    null
  );
  useEffect(() => {
    if ((meta?.currentQuestion ?? -1) < questions.length) {
      setCurrentQuestion(questions[meta?.currentQuestion ?? 0]);
    } else {
      setCurrentQuestion(null);
    }
  }, [questions, meta?.currentQuestion]);

  return [currentQuestion, meta];
};

const submitVote = (pollSlug: string, username: string, optionIdx: number) => {
  const ref = databaseRef(database, `/votes/${pollSlug}/${username}`);
  return set(ref, optionIdx);
};

export { useCurrentQuestion, submitVote };

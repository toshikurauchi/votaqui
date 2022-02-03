import {
  child,
  get,
  off,
  onValue,
  ref as databaseRef,
  set,
} from "firebase/database";
import { useEffect, useState } from "react";
import { IPollMeta, IQuestion, IResult } from "../models/poll";
import { database } from "../services/firebase-client";

export interface IPollMetaWithSetters extends IPollMeta {
  setCurrentQuestion: (currentQuestion: number) => void;
  setAcceptingVotes: (acceptingVotes: boolean) => void;
}

export const usePollMeta = (pollSlug: string) => {
  const path = `/polls/${pollSlug}/meta`;
  const [meta, setMeta] = useState<IPollMetaWithSetters | null>();

  useEffect(() => {
    const query = databaseRef(database, path);
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      const setCurrentQuestion = (currentQuestion: number) => {
        set(child(query, "currentQuestion"), currentQuestion);
      };
      const setAcceptingVotes = (acceptingVotes: boolean) => {
        set(child(query, "acceptingVotes"), acceptingVotes);
      };
      setMeta({ ...data, setCurrentQuestion, setAcceptingVotes });
    });

    return () => {
      off(query);
    };
  }, [path]);

  return meta;
};

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

export const useQuestions = (pollSlug: string) => {
  return useSnapshot<IQuestion[]>(`/polls/${pollSlug}/questions`, []);
};

export const useVotes = (pollSlug: string, questionIdx: number) => {
  return useSnapshot<IResult | null>(`/votes/${pollSlug}/${questionIdx}`, null);
};

export const useCurrentQuestion = (
  pollSlug: string
): [IQuestion | null, IPollMeta | null] => {
  const meta = useSnapshot<IPollMeta | null>(`/polls/${pollSlug}/meta`, null);

  const questions = useQuestions(pollSlug);

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

export const submitVote = (
  pollSlug: string,
  questionIdx: number,
  username: string,
  optionIdx: number
) => {
  const ref = databaseRef(
    database,
    `/votes/${pollSlug}/${questionIdx}/${username}`
  );
  return set(ref, optionIdx);
};

export const pollExists = (pollSlug: string) => {
  const ref = databaseRef(database, `/polls/${pollSlug}`);
  return get(ref)
    .then((snapshot) => snapshot.exists())
    .catch(() => false);
};

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getDataModelsProgress } from "services/data-models";
import sse from "services/sse-service";
import { TrainingProgressData } from "types/dataModels";
import { SSEEventData } from "types/datasetGroups";

export const useTrainingSessions = () => {
  const [progresses, setProgresses] = useState<TrainingProgressData[]>([]);

  const { data: progressData } = useQuery<TrainingProgressData[]>(
    ['datamodels/progress'],
    () => getDataModelsProgress(),
    {
      onSuccess: (data) => {
        setProgresses(data);
      },
    }
  );

  const handleUpdate = (sessionId: string, newData: SSEEventData) => {
    setProgresses((prevProgresses) =>
      prevProgresses.map((progress) =>
        progress.id === sessionId ? { ...progress, ...newData } : progress
      )
    );
  };

  useEffect(() => {
    if (!progressData) return;

    const eventSources = progressData
      .filter(
        (progress) =>
          !(progress.trainingStatus === 'deployed'||progress.trainingStatus === 'failed') &&
          progress.progressPercentage !== 100
      )
      .map((progress) =>
        sse(`/${progress.id}`, 'dataset', (data: SSEEventData) => {
          console.log(`New data for notification ${progress.id}:`, data);
          handleUpdate(data.sessionId, data);
        })
      );

    return () => {
      eventSources.forEach((eventSource) => eventSource?.close());
      console.log('SSE connections closed');
    };
  }, [progressData, refetch]);

  return progresses;
};

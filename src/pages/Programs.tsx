import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgramDataTable } from "./programs/ProgramDataTable";
import { ProgramSheet, Program, ProgramType } from "./programs/ProgramSheet";
import { getStagePrograms } from "@/queries/stagePrograms";
import { getNonStagePrograms } from "@/queries/nonStagePrograms";
import { getSportsPrograms } from "@/queries/sportsPrograms";

const Programs = () => {
  const [activeTab, setActiveTab] = useState<ProgramType>("stage");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  const { data: stagePrograms, isLoading: isLoadingStage } = useQuery({
    queryKey: ["stagePrograms"],
    queryFn: getStagePrograms,
  });

  const { data: nonStagePrograms, isLoading: isLoadingNonStage } = useQuery({
    queryKey: ["nonStagePrograms"],
    queryFn: getNonStagePrograms,
  });

  const { data: sportsPrograms, isLoading: isLoadingSports } = useQuery({
    queryKey: ["sportsPrograms"],
    queryFn: getSportsPrograms,
  });

  const handleAddNew = () => {
    setEditingProgram(null);
    setIsSheetOpen(true);
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Programs</h1>
          <p className="text-muted-foreground">Manage stage, non-stage, and sports events</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Program
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProgramType)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stage">Stage</TabsTrigger>
          <TabsTrigger value="nonstage">Non-Stage</TabsTrigger>
          <TabsTrigger value="sports">Sports</TabsTrigger>
        </TabsList>
        <TabsContent value="stage">
          <ProgramDataTable
            programType="stage"
            data={stagePrograms}
            isLoading={isLoadingStage}
            onEdit={handleEdit}
          />
        </TabsContent>
        <TabsContent value="nonstage">
          <ProgramDataTable
            programType="nonstage"
            data={nonStagePrograms}
            isLoading={isLoadingNonStage}
            onEdit={handleEdit}
          />
        </TabsContent>
        <TabsContent value="sports">
          <ProgramDataTable
            programType="sports"
            data={sportsPrograms}
            isLoading={isLoadingSports}
            onEdit={handleEdit}
          />
        </TabsContent>
      </Tabs>

      <ProgramSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        programType={activeTab}
        program={editingProgram}
      />
    </div>
  );
};

export default Programs;

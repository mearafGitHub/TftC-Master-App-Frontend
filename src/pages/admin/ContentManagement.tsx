
import DashboardLayout from "@/components/layout/DashboardLayout";
import ContentEditor from "@/components/admin/ContentEditor";

const ContentManagement = () => {
  return (
    <DashboardLayout isAdmin title="Content Management">
      <ContentEditor />
    </DashboardLayout>
  );
};

export default ContentManagement;

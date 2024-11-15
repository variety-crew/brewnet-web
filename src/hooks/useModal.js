import { useDialog } from 'primevue';

export function useModal() {
  const dialog = useDialog();

  const openDialog = ({ component, header, data }) => {
    dialog.open(component, {
      props: {
        header,
        style: {
          width: '50vw',
        },
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw',
        },
        modal: true,
      },
      data,
    });
  };

  return { openDialog };
}

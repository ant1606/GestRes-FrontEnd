import Button from '#/components/Button';
import React, { useEffect, useRef } from 'react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { WebPageProvider, useWebPage } from './context/webPage.context';
import Form from './components/Form/Form';
import { toastNotifications } from '#/utilities/notificationsSwal';
import FooterTable from '#/components/FooterTable';
import Filter from './components/Filter';
import { getWebPages } from '#/services/webPage.services';
import perPageItemsValue from '#/config/perPageItemsValue';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { changeTitle } from '#/redux/slice/uiSlice';
import Table from './components/Table';
import Loader from '#/components/Loader';
import { type RootState } from '#/redux/store';
import { useFetch } from '#/hooks/useFetch';
import TableSkeleton from '#/components/Skeleton/TableSkeleton';

interface ReactPaginaOnPageChangeArgument {
  selected: number;
}

const WebPageView: React.FC = () => {
  const uiLoading = useAppSelector((state: RootState) => state.ui.loadingState);
  const {
    webPages,
    webPageMeta,
    setWebPages,
    webPagePerPage,
    setWebPagePerPage,
    webPageSearchLoading,
    setWebPageSearchLoading
  } = useWebPage();
  const MySwal = withReactContent(Swal);
  const modalRef = useRef(MySwal);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { fetchWithSessionHandling } = useFetch();

  useEffect(() => {
    setWebPagePerPage(perPageItemsValue[0].id);
    dispatch(changeTitle('Mantenimiento de Páginas Web'));
  }, []);

  const handleClick = (): void => {
    MySwal.fire({
      title: 'Registrar Páginas Web',
      html: (
        <BrowserRouter>
          <WebPageProvider>
            <Form
              modalRef={modalRef.current}
              fetchWithSessionHandling={fetchWithSessionHandling}
              onFormSubmit={() => {
                handleFormSubmit();
              }}
            />
          </WebPageProvider>
        </BrowserRouter>
      ),
      showConfirmButton: false,
      allowOutsideClick: true
    });
  };

  const handleFormSubmit = async (): Promise<void> => {
    modalRef.current?.close();
    toastNotifications().toastSucces();
    const webPages = await getWebPages(searchParams.toString(), fetchWithSessionHandling);
    setWebPages(webPages);
  };

  const handlePageChange = async (e: ReactPaginaOnPageChangeArgument): Promise<void> => {
    setWebPageSearchLoading(true);
    searchParams.delete('page');
    searchParams.append('page', (e.selected + 1).toString());
    searchParams.delete('perPage');
    searchParams.append('perPage', webPagePerPage);
    searchParams.sort();
    setSearchParams(searchParams);

    const webPages = await getWebPages(searchParams.toString(), fetchWithSessionHandling);
    setWebPageSearchLoading(false);
    setWebPages(webPages);
  };

  const handlePageChangeWrapper = (e: ReactPaginaOnPageChangeArgument): void => {
    handlePageChange(e);
  };

  return (
    <>
      {uiLoading && <Loader />}
      <Button btnType="main" text="Registrar" type="button" onClick={handleClick} />
      <Filter />
      {(webPageSearchLoading as boolean) ? (
        <TableSkeleton />
      ) : webPages.length === 0 ? (
        <p>No se encontraron resultados</p>
      ) : (
        <>
          <Table />
          {webPageMeta !== null && (
            <FooterTable handlePageChange={handlePageChangeWrapper} {...webPageMeta} />
          )}
        </>
      )}
    </>
  );
};

export default WebPageView;

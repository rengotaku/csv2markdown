import React, { useRef, useEffect } from 'react'
// @ts-expect-error: I do not know how to treat
import DataGridXL from '@datagridxl/datagridxl2';
import { Card, CardBody, Textarea, Center, useClipboard, useToast, Button, Alert, AlertIcon } from '@chakra-ui/react'

export const TopPage: React.FunctionComponent = () => {
  const DELIMITER = "|";
  const DELIMITER_HEAD = `${DELIMITER} `;
  const DELIMITER_BACK = ` ${DELIMITER}`;
  const DELIMITER_ITEMS = ` ${DELIMITER} `;
  const { onCopy, value, setValue } = useClipboard("");
  const dgxlRef = useRef(null);
  const toast = useToast();

  const changeHandler = function(){
    // @ts-expect-error: I do not know how to treat
    const tableData = dgxlRef.current!["grid"].getData();

    if (tableData.length === 0) {
      setValue("");
      return;
    }

    let tstr = "";
    // Titles of header
    tstr += DELIMITER_HEAD + tableData[0].join(DELIMITER_ITEMS) + DELIMITER_BACK;
    tstr += "\r\n";

    // Dividers of header
    tstr += DELIMITER + tableData[0].map(function () { return "---" }).join(DELIMITER) + DELIMITER;
    tstr += "\r\n";

    if (tableData.length === 1) {
      tstr += DELIMITER_HEAD + tableData[0].map(function () { return "dummy" }).join(DELIMITER_ITEMS) + DELIMITER_BACK;
      tstr += "\r\n";
      setValue(tstr);
      return;
    }

    // values
    tableData.slice(1, tableData.length).forEach(function (cols: [string[]]) {
      tstr += DELIMITER_HEAD + cols.join(DELIMITER_ITEMS) + DELIMITER_BACK + "\r\n";
    })

    setValue(tstr);
  };

  const resetDataGlid = function(){
    // create only once
    // @ts-expect-error: I do not know how to treat
    dgxlRef.current["grid"] = new DataGridXL(dgxlRef.current, {
      data: [[""]],
      rowHeaderWidth: 40,
    });
    // @ts-expect-error: I do not know how to treat
    dgxlRef.current["grid"].events.on('change', changeHandler);

    setValue("");
  };

  // similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    // @ts-expect-error: I do not know how to treat
    if(!dgxlRef.current["grid"]){
      resetDataGlid();
    }
  })

  return (
    <>
      <Center as='section' mb={2}>
        <Card>
          <CardBody>
            <Button colorScheme='teal' mb={2} onClick={() => {
              resetDataGlid();
            }}>Clear</Button>
            <Alert status='info'>
              <AlertIcon />
              Copy from Excel or Spreadsheet, then pasted !
            </Alert>
            <div ref={dgxlRef} style={{height: '500px', width: '48vw'}} />
          </CardBody>
        </Card>
      </Center>

      <Center as='section' mb={2}>
        <Card>
          <CardBody>
            {/* <Checkbox defaultChecked>First row as headers</Checkbox>
            <Divider mb={2}></Divider> */}
            <Textarea value={value} placeholder='Writtend down here as markdown'  style={{width: '48vw'}}
              // onFocusだと無限ループが発生する
              onMouseDown={(e) => {
                e.preventDefault();
                onCopy();

                toast({
                  title: 'Copied.',
                  status: 'success',
                  duration: 1000,
                  isClosable: true,
                });
              }} 
            />
          </CardBody>
        </Card>
      </Center>
    </>
  )
}

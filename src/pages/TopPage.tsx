import React, { useRef, useEffect } from 'react'
// @ts-expect-error: I do not know how to treat
import DataGridXL from '@datagridxl/datagridxl2';
import { Card, CardBody, Textarea, Container, Center, useClipboard, useToast } from '@chakra-ui/react'

export const TopPage: React.FunctionComponent = () => {
  const DELIMITER = " | ";
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
    tstr += DELIMITER + tableData[0].join(DELIMITER) + DELIMITER;
    tstr += "\r\n";

    // Dividers of header
    tstr += "|" + tableData[0].map(function () { return "---" }).join("|") + "|";
    tstr += "\r\n";

    if (tableData.length === 1) {
      tstr += DELIMITER + tableData[0].map(function () { return "dummy" }).join(DELIMITER) + DELIMITER;
      tstr += "\r\n";
      setValue(tstr);
    }

    // values
    tableData.slice(1, tableData.length).forEach(function (cols: [string[]]) {
      tstr += DELIMITER + cols.join(DELIMITER) + DELIMITER + "\r\n";
    })

    setValue(tstr);
  };

  // similar to componentDidMount and componentDidUpdate
  useEffect(() => {

    if(!dgxlRef.current!["grid"]){
      // create only once
      // @ts-expect-error: I do not know how to treat
      dgxlRef.current!["grid"] = new DataGridXL(dgxlRef.current, {
        data: [[""]],
        rowHeaderWidth: 40,
      });
      // @ts-expect-error: I do not know how to treat
      dgxlRef.current!["grid"].events.on('change', changeHandler);
    }
  })

  return (
    <>
      <Center as='section' mb={2}>
        <Card>
          <CardBody>
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

      <Container>
        <div style={{color: 'rgb(100 116 139)'}}>
          TSV2Markdown
          | <span style={{fontSize: '10px'}}>data grid by <a href="https://datagridxl.com/" target="_blank">DataGridXL</a></span>
        </div>
      </Container>
    </>
  )
}

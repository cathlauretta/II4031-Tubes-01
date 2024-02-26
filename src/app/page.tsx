"use client"
import { Button, ButtonGroup, Flex, FormLabel, Heading, Input, Radio, RadioGroup, Select, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const DEFAULT_BG_COLOR = '#ffffff';
const ALGO_LIST = ['Vigenere Cipher', 'Extended Vigenere Cipher', 'Autokey Vigenere Cipher', 'Playfair Cipher', 'Product Cipher', 'Affine Cipher']

export default function Home() {
  const [value, setValue] = useState('encrypt');
  const [algo, setAlgo] = useState<string>('');
  const [inputType, setInputType] = useState<string>('text');

  const handleAlgoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgo(e.target.value);
  }

  const handleInputTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputType(e.target.value);
  }

  return (
    <Flex bgColor={'#f2f4f6'} minHeight={'100vh'} gap={12} flexDir={'column'} paddingTop={8} alignItems={'center'}>
      {value === 'encrypt' ? <Heading>En-Crypto</Heading> : <Heading>De-Crypto</Heading>}
      <Flex flexDir={'column'} width={{base:'80%', md:'70%'}} gap={4}>
        <Flex flexDir={'column'}>
          <FormLabel>Input Type</FormLabel>
          <Select bgColor={DEFAULT_BG_COLOR} onChange={(e) => handleInputTypeChange(e)}>
            <option value='text'>Text</option>
            <option value='file'>File</option>
          </Select>
        </Flex>
        
        {inputType === 'text' ?
        <Flex flexDir={'column'}>
          <FormLabel>Input Text</FormLabel>
          <Textarea
            placeholder="Enter text to encrypt or decrypt"
            bgColor={DEFAULT_BG_COLOR}
            height={'100px'}
            resize={'none'}
          />
        </Flex>
        :
        <Flex flexDir={'column'}>
          <FormLabel>Upload File</FormLabel>
          <Input type="file" bgColor={DEFAULT_BG_COLOR}/>
        </Flex>
        }

        <Flex flexDir={'column'}>
          <FormLabel>Cipher Algorithm</FormLabel>
          <Select placeholder="Select a cipher algorithm" bgColor={DEFAULT_BG_COLOR} onChange={(e) => handleAlgoChange(e)}>
            {ALGO_LIST.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </Select>
        </Flex>

        {algo === 'Affine Cipher' ?
          <Flex flexDir={'row'} gap={4} justifyContent={'space-between'}>
            <Flex flexDir={'column'} width={'100%'}>
              <FormLabel>M-Key</FormLabel>
              <Input placeholder="Enter a number that is relative prime to 26" bgColor={DEFAULT_BG_COLOR}/>
            </Flex>
            <Flex flexDir={'column'} width={'100%'}>
              <FormLabel>B-Key</FormLabel>
              <Input placeholder="Enter a number" bgColor={DEFAULT_BG_COLOR}/>
            </Flex>
          </Flex>
          : 
          <Flex flexDir={'column'}>
            <FormLabel>Key</FormLabel>
            <Input placeholder="Enter a key" bgColor={DEFAULT_BG_COLOR}/>
          </Flex>
        }

        <RadioGroup onChange={setValue} value={value}>
          <Flex gap={4}>
            <Radio value="encrypt">Encrypt</Radio>
            <Radio value="decrypt">Decrypt</Radio>
          </Flex>
        </RadioGroup>
      </Flex>
      <ButtonGroup spacing={4}>
          {value === 'encrypt' ? <Button>Encrypt</Button> : <Button>Decrypt</Button>}
            <Button>Download File</Button>
      </ButtonGroup>
    </Flex>
  );
}

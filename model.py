import sys
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from MyModel_ import trainedModel as tm
model_name =''
tokenizer = ''
model = ''

def FixCode(text):
    buggy_code = f"fix :{text}"
    inputs = tokenizer(buggy_code, return_tensors="pt")
    outputs = model.generate(**inputs)
    fixed_code = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return fixed_code

def getFix():
    if(len(sys.argv) < 2):
        raise ValueError("No code input provided. Pass the code as the last command-line argument.")
    code = sys.argv[-1]
    fix = FixCode(code)
    return fix

if __name__ == '__main__':
    model_ = tm.Model
    tokenizer = AutoTokenizer.from_pretrained(model_)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_)

    print(getFix())

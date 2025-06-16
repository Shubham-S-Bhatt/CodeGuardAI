import os
from transformers import pipeline

# load once
_model = None
def _get_model():
    global _model
    if _model is None:
        _model = pipeline(
            "text2text-generation",
            model="Salesforce/codegen-350M-multi",
            device=0 if os.getenv("CUDA_DEVICE") else -1,
            tokenizer="Salesforce/codegen-350M-multi",
            config={"max_length": 512},
            use_auth_token=os.getenv("HF_TOKEN")
        )
    return _model

def analyze_diff(diff: str) -> str:
    prompt = (
        "You are an expert code reviewer. Suggest fixes, flag bugs, and improvements "
        "for the following unified diff:\n\n" + diff
    )
    model = _get_model()
    result = model(prompt, max_length=512, num_return_sequences=1)
    return result[0]['generated_text']
